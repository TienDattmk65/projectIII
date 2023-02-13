import {connectToDatabase} from "../../../util/mongodb";
import {ObjectId} from "bson";

const handler = async (req, res) => {
  const {db} = await connectToDatabase();

  switch (req.method) {
    case "GET":
      try {
        let response = await db
          .collection("accounts")
          .findOne({_id: new ObjectId(req.query.id)});
        return res.json(response);
      } catch (e) {
        res.status(400).json({message: e});
      }

    case "PUT":
      try {
        let data = req.body;

        const updateAccount = async () => {
          let response = await db.collection("accounts").updateOne(
            {_id: new ObjectId(req.query.id)},
            {
              $set: {
                account: data.account,
                //   password: data.password,
                type: data.type,
              },
            }
          );
          return res.status(200).json({message: "Edit Account Success"});
        };

        const currentAccount = await db
          .collection("accounts")
          .findOne({_id: new ObjectId(req.query.id)});

        const checkAccountDuplicate =
          (await db
            .collection("accounts")
            .find({account: `${data.account}`})
            .count()) !== 0;

        if (currentAccount.account === data.account) {
          return updateAccount();
        }

        if (checkAccountDuplicate) {
          return res.status(400).json({message: "Duplicate Account"});
        }

        return updateAccount();
      } catch (e) {
        res.status(400).json({message: e});
      }

    case "DELETE":
      try {
        let response = await db
          .collection("accounts")
          .deleteOne({_id: new ObjectId(req.query.id)});
        return res.status(200).json({message: "Delete Account Success"});
      } catch (e) {
        res.status(400).json({message: e});
      }

    default:
      return res.status(405).json({message: "Method not allowed"});
  }
};

export default handler;