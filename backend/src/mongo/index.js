import mongoose from "mongoose";
import * as Model from "../model"

import pubsub from '../pubsub'

let logger = require("../utils/logger");

const modelExists =()=>{
  Model.Bank.find({}, async(err, result) => {
    if (result.length > 0) {
      // console.log('Found Model.Bank');
    } else {
      // console.log('Not found Model.Bank, creating');
      let newBank = new Model.Bank({name: "test"});
      await newBank.save();

      await Model.Bank.deleteMany({})
    }
  });

  Model.Post.find({}, async(err, result) => {
    if (result.length > 0) {
      // console.log('Found Model.Post');
    } else {
      // console.log('Not found Model.Post, creating');
      let newPost = new Model.Post({});
      await newPost.save();

      await Model.Post.deleteMany({})
    }
  });

  Model.Role.find({},async(err, result) =>{
    if (result.length > 0) {
      // console.log('Found Model.Role');
    } else {
      // console.log('Not found Model.Role, creating');
      let newRole = new Model.Role({name: "test"});
      await newRole.save();

      await Model.Role.deleteMany({})
    }
  });

  Model.Socket.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Socket');
    } else {
      // console.log('Not found Model.Socket, creating');
      let newSocket = new Model.Socket({});
      await newSocket.save();

      await Model.Socket.deleteMany({})
    }
  });

  Model.User.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newUser = new Model.User({
                              username: "username",
                              password: "password",
                              email: "email@banlist.info",
                              displayName: "displayName",
                            });
      await newUser.save();
      await Model.User.deleteMany({})
    }
  });

  Model.Comment.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newComment = new Model.Comment({_id: mongoose.Types.ObjectId()});
      await newComment.save();
      await Model.Comment.deleteMany({})
    }
  });

  Model.Mail.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Mail');
    } else {
      let newMails = new Model.Mail({});
      await newMails.save();
      await Model.Mail.deleteMany({})
    }
  });

  Model.Bookmark.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Bookmark');
    } else {
      let newBookmarks = new Model.Bookmark({});
      await newBookmarks.save();
      await Model.Bookmark.deleteMany({})
    }
  });

  Model.Report.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Report');
    } else {
      let newReport = new Model.Report({});
      await newReport.save();
      await Model.Report.deleteMany({})
    }
  });

  Model.tReport.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.tReport');
    } else {
      let newTReport = new Model.tReport({});
      await newTReport.save();
      await Model.tReport.deleteMany({})
    }
  });

  Model.Share.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Share');
    } else {
      let newShare = new Model.Share({});
      await newShare.save();
      await Model.Share.deleteMany({})
    }
  });

  Model.Dblog.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Dblog');
    } else {
      let newDblog = new Model.Dblog({});
      await newDblog.save();
      await Model.Dblog.deleteMany({})
    }
  });

  Model.Conversation.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Conversation');
    } else {
      let newConversation = new Model.Conversation({senderId: mongoose.Types.ObjectId()});
      await newConversation.save();
      await Model.Conversation.deleteMany({})
    }
  });

  Model.Message.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Message');
    } else {
      /*
      _id: { type: Schema.Types.ObjectId, required:[true, "_id is a required field"] },
    conversationId: { type: Schema.Types.ObjectId, required:[true, "Conversation-Id is a required field"] },
      */
      let newMessage = new Model.Message({_id: mongoose.Types.ObjectId(), 
                                          conversationId: mongoose.Types.ObjectId(),
                                          senderId: mongoose.Types.ObjectId(),
                                        });
      await newMessage.save();
      await Model.Message.deleteMany({})
    }
  });

  Model.Follow.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Follow');
    } else {
      let newFollow = new Model.Follow({});
      await newFollow.save();
      await Model.Follow.deleteMany({})
    }
  });

  Model.Session.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.Session');
    } else {
      let newSession = new Model.Session({ userId: new mongoose.Types.ObjectId(), token: "token", expired:new Date() });
      await newSession.save();
      await Model.Session.deleteMany({})
    }
  });

  Model.Notification.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newNotification = new Model.Notification({ user_to_notify: new mongoose.Types.ObjectId(), user_id_approve: new mongoose.Types.ObjectId() });
      await newNotification.save();
      await Model.Notification.deleteMany({})
    }
  });

  Model.Phone.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newPhone = new Model.Phone({});
      await newPhone.save();
      await Model.Phone.deleteMany({})
    }
  });

  Model.BasicContent.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newBasicContent = new Model.BasicContent({title: "text"});
      await newBasicContent.save();
      await Model.BasicContent.deleteMany({})
    }
  });

  Model.Supplier.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newSupplier = new Model.Supplier({title: "title", 
                                            price: 0, 
                                            priceUnit: 0, 
                                            condition: 1,
                                            manageLottery: new mongoose.Types.ObjectId(),
                                            ownerId: new mongoose.Types.ObjectId() });
      await newSupplier.save();
      await Model.Supplier.deleteMany({})
    }
  });

  Model.Deposit.find({}, async(err, result)=> {
    try{
      if (result.length > 0) {
        // console.log('Found Model.BasicContent');
      } else {
        let newDeposit = new Model.Deposit({ accountNumber: "test", 
                                       userIdRequest: new mongoose.Types.ObjectId(), 
                                       userIdApprove: new mongoose.Types.ObjectId(),
                                       bankId: "bankId" });
        await newDeposit.save();
        await Model.Deposit.deleteMany({})
      }
    } catch(err) {
      console.log("Model.Deposit : ", err)
    }
  });

  Model.Withdraw.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newWithdraw = new Model.Withdraw({bankId: new mongoose.Types.ObjectId(), userIdRequest: new mongoose.Types.ObjectId() });
      await newWithdraw.save();
      await Model.Withdraw.deleteMany({})
    }
  });

  Model.Transition.find({}, async(err, result)=> {
    if (result.length > 0) {
      // console.log('Found Model.BasicContent');
    } else {
      let newTransition = new Model.Transition({  refId: new mongoose.Types.ObjectId(),
                                            userId: new mongoose.Types.ObjectId() });
      await newTransition.save();
      await Model.Transition.deleteMany({})
    }
  });

  Model.DateLottery.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newDateLottery = new Model.DateLottery({  date: new Date(),
                                              weight: 1 });
      await newDateLottery.save();
      await Model.DateLottery.deleteMany({})
    }
  });

  Model.ContactUs.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newContactUs = new Model.ContactUs({  title: "title",
                                          description: "description" });
      await newContactUs.save();
      await Model.ContactUs.deleteMany({})
    }
  });

  Model.Test.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newTest = new Model.Test({  message: 0 });
      await newTest.save();
      await Model.Test.deleteMany({})
    }
  });


  Model.ManageLottery.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newManageLottery = new Model.ManageLottery({ title: "xxx", start_date_time: new Date(), end_date_time: new Date() });
      await newManageLottery.save();
      await Model.ManageLottery.deleteMany({})
    }
  });

  Model.Member.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newMember = new Model.Member({current:{
                                                  username: "username",
                                                  password: "password",
                                                  email: "email@banlist.info",
                                                  displayName: "displayName",
                                                }
                                        });
      await newMember.save();
      await Model.Member.deleteMany({})
    }
  });

  Model.MLM.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newMLM = new Model.MLM({});
      
      await newMLM.save();
      await Model.MLM.deleteMany({})
    }
  });

  // LogUserAccess
  Model.LogUserAccess.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newLogUserAccess = new Model.LogUserAccess({current:{ websocketKey: "test", userId: new mongoose.Types.ObjectId() }});
      
      await newLogUserAccess.save();
      await Model.LogUserAccess.deleteMany({})
    }
  });

  Model.File.find({}, async(err, result)=> {
    if (result.length > 0) {
    } else {
      let newFile = new Model.File({ userId: new mongoose.Types.ObjectId() });
      
      await newFile.save();
      await Model.File.deleteMany({})
    }
  });
}

// TODO: initial and connect to MongoDB
mongoose.Promise = global.Promise;
// mongoose.connect("YOUR_MONGODB_URI", { useNewUrlParser: true });

// console.log(">>>>> process.env.MONGO_URI :", process.env)
// uri
mongoose.connect(
  // "mongodb://mongo1:27017,mongo2:27017/bl?replicaSet=rs",
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useFindAndModify: false, // optional
    useCreateIndex: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 100000, // Defaults to 30000 (30 seconds)
    poolSize: 100, // Set the maximum number of connections in the connection pool
  }
);

const connection = mongoose.connection;
connection.on("error", (err)=>{
  // console.error.bind(console, "Error : Connection to database")

  // logger.error("Error : Connection to database :", err.toString() )
  console.log("Error : Connection to database :", err.toString() )
});
connection.once("open", async function () {
  // we're connected!
  console.log("Successfully : Connected to database!");

  // logger.info("Successfully : Connected to database!")

  modelExists()


  // # MUST SET replSet before
  // // Get the MongoDB client 
  // const client = mongoose.connection.getClient();
  // // Now you can use the MongoDB client for operations
  // const database = client.db(process.env.MONGO_INITDB_DATABASE);
  // const collection = database.collection("mlm");
  // const changeStream = collection.watch();
  // changeStream.on('change', next => {
  //   // process next document
  //   console.log("---------------change-----------------")
  // });

  // // Watch for changes on the collection
  // const changeStreamFile = Model.File.watch();

  // // Handle change stream events
  // changeStreamFile.on('change', (change) => {
  //     console.log('Change detected:', change);
  //     // Handle the change event here (insert, update, delete)
  // });

  // Watch for changes on the collection
  const changeStreamMember = Model.Member.watch();
  // Handle change stream events
  changeStreamMember.on('change', (change) => {
    console.log('Change detected:', change);
    // Handle the change event here (insert, update, delete)
    switch(change?.operationType){
      case 'insert':
        console.log('A new user was added:', change.fullDocument);
        break;
      case 'update':
          console.log('User updated:', change.documentKey);
          break;
      case 'replace':
          console.log('User replaced:', change.fullDocument);
          break;
      case 'delete':
          console.log('User deleted:', change.documentKey);

          pubsub.publish('USER_CONNECTED', { userConnected: 'A user connected + delete : ' + Math.floor(Math.random() * 100) });

          break;
      default:
          console.log('Unknown operation type:', change.operationType);
    }
  });

});

export default connection;