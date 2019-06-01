/**
 * Router for /api/users
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import {
    getUsers,
    deleteAllUsers,
    login,
    exportUsersAsCsv,
    updateSingleUserWithToken,
    deleteSingleUserWithToken,
    registerUser,

    createUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
} from './user.controller';

export const userRouter: express.Router = express.Router({ mergeParams: true });

/** READ ALL but check admin before send response req: ?id=... */
userRouter.get('/', logTime, wrapAsync(getUsers));

/** CREATE */
userRouter.post('/register', logTime, wrapAsync(registerUser));

/** Download as CSV data */
userRouter.get('/download', logTime, wrapAsync(exportUsersAsCsv));

/** Delete all activities in the database */
userRouter.delete('/delete_all', logTime, wrapAsync(deleteAllUsers));

/** READ BY email and address with query ?email=..&&address=.. */
userRouter.get('/login', logTime, wrapAsync(login));

/** UPDATE */
userRouter.put('/update/:token', logTime, wrapAsync(updateSingleUserWithToken));

/** DELETE */
userRouter.delete('/delete/:token', logTime, wrapAsync(deleteSingleUserWithToken));


/**For Testing*/

/** CREATE */
userRouter.post('/', logTime, wrapAsync(createUser));

/** READ BY ID */
userRouter.get('/:userid', logTime, wrapAsync(getSingleUser));

/** UPDATE */
userRouter.put('/:userid', logTime, wrapAsync(updateSingleUser));

/** DELETE */
userRouter.delete('/:userid', logTime, wrapAsync(deleteSingleUser));

