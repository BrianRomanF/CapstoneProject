import firebaseAdmin from 'firebase-admin';
import fs from "fs";

const initializeFirebaseAdmin = () => {
    const credentials = JSON.parse(fs.readFileSync('./credentials.json' ));
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  });
};

const authenticate = async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
      try {
        req.user = await firebaseAdmin.auth().verifyIdToken(authtoken);
      } catch (e) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
    }
    req.user = req.user ||{};
    next();
  };




export { initializeFirebaseAdmin, authenticate };