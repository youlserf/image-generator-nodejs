// Import required modules and packages
import express from "express"; // Express framework for building web applications
import { Configuration, OpenAIApi } from "openai"; // OpenAI API client library
import dotenv from "dotenv"; // Load environment variables from .env file
import cors from "cors"; // Enable Cross-Origin Resource Sharing (CORS) for API requests
import download from "image-downloader"; // Download images from URLs
import { createReadStream } from "fs"; // Read files as readable streams

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const port = 3000;

// Configure middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse request body as JSON

// Generate Image endpoint
app.post("/generate", async (req, res) => {
  // Extract prompt and key from the request body
  const { prompt, key } = req.body;
  console.log(key, prompt);
  try {
    // Configure OpenAI API with the provided key
    const configuration = new Configuration({
      apiKey: key,
    });
    const openai = new OpenAIApi(configuration);

    // Make a request to OpenAI API to generate an image
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });

    // Extract the generated image URL from the API response
    const image_url = response.data.data[0].url;

    // Send the image URL as the API response
    res.json({ data: { image: image_url } });
  } catch (error) {
    // Handle errors that occur during the generation process
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to generate completion." });
  }
});

// Edit Image endpoint
app.post("/edit", async (req, res) => {
  // Extract image, prompt, and key from the request body
  const { image, prompt, key } = req.body;
  try {
    // Configure OpenAI API with the provided key
    const configuration = new Configuration({
      apiKey: key,
    });
    const openai = new OpenAIApi(configuration);

    // Download the image from the provided URL
    const options = {
      url: image,
      dest: "../../uploads/photo.png", // Save the image to ./uploads/photo.png
    };
    const { filename } = await download.image(options);
    console.log("Saved to", filename);

    // Create a readable stream from the downloaded image file
    const streamImage = createReadStream(filename);

    // Make a request to OpenAI API to edit the image
    const response = await openai.createImageEdit(
      streamImage,
      prompt,
      1,
      "256x256"
    );

    // Extract the edited image URL from the API response
    const image_url = response.data.data[0].url;

    console.log("image_url:", image_url);

    // Send the edited image URL as the API response
    res.json({ data: { image: image_url } });
  } catch (error) {
    // Handle errors that occur during the editing process
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to generate completion." });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
