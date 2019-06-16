import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map/map.service';
import {Message} from "../../../models/message.model";
import {MessageService} from "../../../services/message/message.service";
import { UserService } from 'src/app/services/user/user.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { MessageCategoryService } from 'src/app/services/message/message-category/message-category.service';
import { UserCategoryService } from 'src/app/services/user/user-category/user-category.service';
import { MessageCategory } from 'src/app/models/message-category.model';
import { EmailService } from 'src/app/services/email/email.service';

/**
 * @description class for the uploaded image
 * @class ImageSnippet
 */
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  constructor(private userService: UserService, 
    private messageService : MessageService, 
    private mapService: MapService,
    private categoryService: CategoryService,
    private messageCategoryService: MessageCategoryService,
    private userCategoryService: UserCategoryService,
    private emailService: EmailService) { }

  /**
   * @description selected image of the input file
   * @type {ImageSnippet}
   * @memberof CreateMessageComponent
   */
  selectedFile: ImageSnippet;

  /**
   * @description selected categories of the message.
   * @type {Category[]}
   * @memberof CreateMessageComponent
   */
  selectedCategories: Category[];

  /**
   * @description message that will be created.
   * @type {Message}
   * @memberof CreateMessageComponent
   */
  newMessage: Message = {
    title: '',
    description: '',
    creatorId: this.userService.user ? this.userService.user._id : "12345",
    lon: null,
    lat: null,
    address: '',
    available: true,
    archive: false,
    imageUrl: 'https://cdn1.stuttgarter-zeitung.de/media.media.ec722513-be5c-474a-88d9-db2b05e31ccb.original1024.jpg',
    phone: null,
  }

  listUserIdToSendSubcribeEmail: string[] = [];

  ngOnInit() {
    this.setCreator();
    if (this.categoryService.categories.length == 0){
      
      this.categoryService.getAllCategories().subscribe(response => {
          this.categoryService.categories = response;
          console.log("get categories:  " + JSON.stringify(response));
      })
    }
  }
  /**
   * 1.add new message
   * 2.create new message category
   * 3.find match user category
   * 4.avoid duplicate email
   * 5.send email to subcribe user
   */
  addNewMessage(){
    let newMessage = Object.assign({},this.newMessage);
    this.listUserIdToSendSubcribeEmail = [];
    if(this.userService.user){
      // create new message
      this.messageService.createMessage(newMessage)
      .subscribe(response_message => {

          if (this.selectedCategories.length > 0){
            this.selectedCategories.forEach((category) => {
              let messageCategory : MessageCategory = {
                messageId: response_message._id,
                categoryId: category._id 
              }
              // create new message category
              this.messageCategoryService.createMessageCategory(messageCategory)
              .subscribe(response_message_category => {
                console.log("create message category with category: " + response_message_category.categoryId);
              });
              
              // find user categories , which has the same categoryId
              this.userCategoryService.getUserCategoryByCategoryId(category._id)
              .subscribe(response_user_category => {

                  // avoid duplicate userId
                  if (response_user_category != null && response_user_category.length > 0){
                    response_user_category.forEach( (userCategory) => {
                      if (!(this.listUserIdToSendSubcribeEmail.includes(userCategory.userId))){
                        this.listUserIdToSendSubcribeEmail.push(userCategory.userId);
                      }
                    });
                  }
              });
            });
            setTimeout(() => {
              // send email to each user in the listUserId
              console.log("soifhoiewhfieh");
              console.log(this.listUserIdToSendSubcribeEmail);
              console.log(this.listUserIdToSendSubcribeEmail.length); 
              this.listUserIdToSendSubcribeEmail.forEach((userId) => {
                if (this.userService.user._id != userId){
                  console.log("response user category :" + userId);
                  console.log("response message category :" + response_message._id);
                  
                  this.emailService.sendEmailSubcribe(userId,response_message._id)
                  .subscribe( res => {
                    console.log("send a maching message to user: " + userId);
                  });
                }
              });
            },2000);
          }
          alert ("create message successfully");
      },error => {
        alert (error.error['data'].message);
        //alert("Fail! Please check input again");
      });
    } else {
      alert ("please login to create new message");
    }

  }

  /**
   * @description set the creatorid as the logged in user
   * @memberof CreateMessageComponent
   */
  setCreator = (): void => {
    // this.newMessage.creatorid = this.userService.user ? this.userService.user._id : null;
  }

  /**
   * @description handle the latlon being passed from map component
   * @memberof CreateMessageComponent
   */
  handleMapCoordinateChange = (latlon: any): void => {
    this.changeLatLon(latlon);
    this.changeAddress(latlon);
  }

  /**
   * @description change the latlon of message.
   * @memberof CreateMessageComponent
   */
  changeLatLon = (latlon: any): void => {
    this.newMessage.lat = latlon.lat;
    this.newMessage.lon = latlon.lng;
  }

  /**
   * @description change the address of message.
   * @memberof CreateMessageComponent
   */
  changeAddress = (latlon: any): void => {
    this.mapService.getAddressfromLatLon(latlon.lat, latlon.lng).subscribe(
      (data) => {
        let road = data.road ? data.road : '';
        let house_number = data.house_number ? data.house_number : '';
        let postcode = data.postcode ? data.postcode : '';
        let city = data.city ? data.city : '';
        this.newMessage.address = `${road} ${house_number}, ${postcode} ${city}`;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * @description handle when an image is chosen (upload image to storage server).
   * @memberof CreateMessageComponent
   */
  onFileChange = (e: any): void => {
    const file: File = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFile.pending = true;

      this.messageService.uploadImage(this.selectedFile.file).subscribe(imageUrl => {
        this.selectedFile.pending = false;
        this.selectedFile.status = 'ok';
        this.newMessage.imageUrl = imageUrl;
      }, error => {
        this.selectedFile.pending = false;
        this.selectedFile.status = 'fail';
        this.selectedFile.src = 'https://www.shareicon.net/data/128x128/2015/09/22/105437_cloud_512x512.png';
      });
    });

    reader.readAsDataURL(file);
  }

}
