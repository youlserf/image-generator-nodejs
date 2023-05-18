## Image Generation and Editing API
This is a simple API example that demonstrates how to generate and edit images using the OpenAI API. The API is built using the Express framework for building web applications in Node.js. It provides two endpoints: `/generate` and `/edit` for generating and editing images, respectively.

## Prerequisites
Before running the API, make sure you have the following prerequisites:
- Node.js installed on your system
- OpenAI API key
- Environment variables set in a `.env` file:
  - `OPENAI_API_KEY`: Your OpenAI API key

## Installation
To install and run the API, follow these steps:
1. Clone the repository and navigate to the project directory.
2. Install the dependencies by running the following command:

npm install

npm install

sql
Copy code
3. Create a `.env` file in the project directory and set the `OPENAI_API_KEY` variable with your OpenAI API key.
4. Start the server by running the following command:
npm start

markdown
Copy code
The API will start running on port 3000.

## Endpoints
### Generate Image
- URL: `/generate`
- Method: POST
- Request Body:
- `prompt`: The prompt used to generate the image.
- `key`: Your OpenAI API key.
- Example Request Body:
```json
{
 "prompt": "Generate an image of a cat",
 "key": "your_openai_api_key"
}```

Example Response:
```json
Copy code
{
  "data": {
    "image": "https://example.com/image.jpg"
  }
}
```

### Edit Image
URL: /edit
Method: POST
Request Body:
image: The URL of the image to be edited.
prompt: The prompt used to edit the image.
key: Your OpenAI API key.
Example Request Body:
```json
Copy code
{
  "image": "https://example.com/image.jpg",
  "prompt": "Add sunglasses to the image",
  "key": "your_openai_api_key"
}```
Example Response:
```json
Copy code
{
  "data": {
    "image": "https://example.com/edited_image.jpg"
  }
}
```
