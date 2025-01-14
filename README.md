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
   - Verify:
     ```bash
     aws iam list-users
     ```
     Ensure CLI is installed: `aws --version`.


2. **Node.js and Dependencies:**
   - Install Node.js.
   - Install global dependencies:
     ```bash
     npm install -g serverless@2.28.0
     ```

---

## Components

### 1. AWS Folder
Scripts for S3 operations like bucket management, object manipulation, and CORS updates.
#### Scripts (package.json):
- **Bucket Management:**
  - `npm run createBucket`
  - `npm run deleteBucket`
  - `npm run listBucket`
  - `npm run getBucketLocation`

- **CORS Management:**
  - `npm run putBucketCors`
  - `npm run getBucketCors`
  - `npm run deleteBucketCors`

- **Policy Management:**
  - `npm run putBucketPolicy`
  - `npm run getBucketPolicy`
  - `npm run deleteBucketPolicy`

- **Object Management:**
  - `npm run getObjectPresigned`
  - `npm run listObjects`
  - `npm run deleteObjects`

---


### 2. Node.js Server
Handles local file uploads.


#### Run ( server folder ):

```bash
npm run start
```

---

### 3. Serverless Framework ( serverless folder )
Deploy Lambda functions for S3 operations.

#### Setup ( if not isntalled ):
  ```bash
  npm install -g serverless@2.28.0
  ```

#### Deploy:
```bash
npm run sls:deploy
```

---

### 4. Client ( client folder )
Vite-based frontend for testing.

#### Run:
```bash
npm run dev
```

---
**Credit to:**  
Rahul Ahire  
Was based on his project. 
Rahul explains it very nice!
Thank you Rahul!

Repo: [Github](https://github.com/MeRahulAhire/S3-Ultimate-Guide/tree/master)

YouTube: [S3 Tutorial](https://www.youtube.com/watch?v=6VHc41idHZs)  

## Helpful Links
- [AWS Docs](https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations_Amazon_Simple_Storage_Service.html)
- [Serverless Docs](https://www.serverless.com/framework/docs/)


