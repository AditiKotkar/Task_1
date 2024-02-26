const express = require('express');
const app = express();
//server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const userDatabase = {
  'user123': { id:'user123',name:'aasdf_asd',},
};
 //user id validation
function validateUserID(req, res, next) {
  const userID = req.paeams.userID;
  //user id exist in database
  const user = userDatabase[userID];
  if (!user) {
    return res.status(404).json({error: 'user not found'});
  }
  req.user = user;
  //route handler
  next();
}
//request user id validation
app.get("/api/user/userID", validateUserID, (req,res) => {
  const user = req.user;
  res.json({message: 'User ID validation successfully', user });
});
//error handaling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
