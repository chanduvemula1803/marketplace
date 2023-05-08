import connectMongo from '../../../database/coonection';
import Users from '../../../model/schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  try {
    await connectMongo();
  } catch (error) {
    return res.status(500).json({ error: 'Connection to database failed' });
  }

  if (req.method === 'POST') {
    if (!req.body) return res.status(404).json({ error: 'No form data submitted' });

    const { username, email, password } = req.body;

    try {
      // Check for duplicate users
      const checkexisting = await Users.findOne({ email });
      if (checkexisting) {
        return res.status(422).json({ message: 'User already exists' });
      }

      // Hash the password and create a new user
      const hashedPassword = await hash(password, 12);
      const newUser = new Users({ username, email, password: hashedPassword });
      const savedUser = await newUser.save();

      return res.status(201).json({ status: true, user: savedUser });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(500).json({ message: 'Invalid HTTP method. Only POST is accepted' });
  }
}
