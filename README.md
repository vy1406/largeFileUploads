# AWS S3 Project: Server, Client, and Serverless

This project demonstrates the use of **AWS S3** operations, including file uploads, bucket management, and serverless deployment with Serverless Framework.

---

## Requirements
1. **AWS CLI User:**
   - Create an IAM user with S3 access.
   - Configure AWS CLI:
     ```bash
     aws configure
     ```
     Ensure CLI is installed: `aws --version`.

2. **Node.js and Dependencies:**
   - Install Node.js.
   - Install global dependencies:
     ```bash
     npm install -g serverless@2.28.0
     ```

---

## Project Structure

### 1. AWS Folder
Handles S3 operations via Node.js scripts.

#### Scripts (package.json):
- **Bucket Management:**
  - Create bucket: `npm run createBucket`
  - Delete bucket: `npm run deleteBucket`
  - List buckets: `npm run listBucket`
  - Get bucket location: `npm run getBucketLocation`

- **CORS Management:**
  - Add CORS: `npm run putBucketCors`
  - Get CORS: `npm run getBucketCors`
  - Delete CORS: `npm run deleteBucketCors`

- **Policy Management:**
  - Add bucket policy: `npm run putBucketPolicy`
  - Get bucket policy: `npm run getBucketPolicy`
  - Delete bucket policy: `npm run deleteBucketPolicy`

- **Object Management:**
  - Upload object with presigned URL: `npm run getObjectPresigned`
  - List objects: `npm run listObjects`
  - Delete objects: `npm run deleteObjects`

---

### 2. Local Server
A simple Node.js server handles file uploads.

#### Features:
- Upload single large file in chunks.
- Upload single small file.
- Upload multiple small files.

#### Run Server:
```bash
node index.js
```

---

### 3. Client
A Vite-based frontend with buttons to test file uploads.

#### Run Client:
```bash
npm run dev
```

---

### 4. Serverless
Contains Lambda functions for serverless file operations.

#### Deploy:
```bash
npm run sls:deploy
```

---

## Configuration

### AWS Keys:
- Add keys to environment variables:
  ```javascript
  const CONSTANTS = {
      AWS_REGION: "us-east-1",
      AWS_CURRENT_BUCKET: "your-bucket-name",
  };
  ```
- Avoid hardcoding keys. Use AWS CLI or `.env` files.

### Static Website Hosting:
- Enable website hosting in the bucket properties.
- Add `index.html` for hosting.

---

## Example Commands
1. **Create a bucket:**
   ```bash
   node ./bucket/CRUD/createBucket.js
   ```

2. **Delete a bucket:**
   ```bash
   node ./bucket/CRUD/deleteBucket.js
   ```

3. **Upload files:**
   - Use client buttons or server APIs.

4. **Deploy serverless:**
   ```bash
   serverless deploy
   ```

---

## Resources
- [AWS S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations_Amazon_Simple_Storage_Service.html)
- [Serverless Framework Documentation](https://www.serverless.com/framework/docs/)
