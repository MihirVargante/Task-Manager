// import "dotenv/config";
const mongoose=require("mongoose")
const url="mongodb+srv://mihirvargante:mihir8955@cluster0.ihnmzl3.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Port: ${conn.connection.port}`);
    console.log(`MongoDB Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB()
