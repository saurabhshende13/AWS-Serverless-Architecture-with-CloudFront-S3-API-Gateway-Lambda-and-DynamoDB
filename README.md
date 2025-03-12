# AWS Serverless Architecture with CloudFront, S3, API Gateway, Lambda, and DynamoDB

![architecture](steps/project.png)

## Project Overview
This project demonstrates a fully serverless architecture on AWS to deploy a web application. It leverages:
- **DynamoDB** for data storage
- **Lambda** functions for handling GET and POST operations
- **API Gateway** for exposing APIs
- **S3** for hosting static files (HTML, JavaScript)
- **CloudFront** for content delivery
- **Route 53** for domain name mapping (optional)

## Architecture Flow
1. User interacts with the frontend hosted on **S3 and CloudFront**.
2. API requests are routed through **API Gateway**.
3. API Gateway triggers **Lambda functions** to insert or retrieve data from **DynamoDB**.
4. Data is stored/retrieved and returned to the frontend.

---

## Deployment Steps

### Step 1 - Create DynamoDB Table
1. Navigate to AWS DynamoDB and create a new table:
   - **Table Name**: `employeeData`
   - **Partition Key**: `employeeid` (String)

![step1a](steps/step1a.png)

![step1b](steps/step1b.png)

![step1c](steps/step1c.png)

### Step 2 - Create Lambda Functions
Two Lambda functions will handle inserting and fetching employee data.

#### 1. `insertEmployeeData` Lambda Function
- Create a new Lambda function with the name `insertEmployeeData`.
- Set the **Runtime** to **Python**.

![step2a](steps/step2a.png)

- Attach an existing **execution role** or create a new one with DynamoDB permissions.

![step2bf](steps/step2bf.png)


- Add the code from the repository (`insertEmployeeData.py`).

![step2c](steps/step2c.png)

- Deploy the function.
- Create a test event and verify that data is inserted into DynamoDB.

![step2d](steps/step2d.png)

![step2d2](steps/step2d2.png)

#### 2. `GetEmployee` Lambda Function
- Create another Lambda function named `GetEmployee`.
- Set the **Runtime** to **Python**.

![step2e](steps/step2.png)

- Attach an execution role with the necessary permissions.

![step2bf](steps/step2bf.png)

- Add the code from the repository (`GetEmployee.py`).

![step2g](steps/step2g.png)

- Deploy the function.
- Create a test event and verify that it returns a **200 status code**.

![step2h](steps/step2h.png)

### Step 3 - Create API Gateway
1. Navigate to **API Gateway** and create a **REST API** named `employee-api`.

![step3a](steps/step3a.png)

2. Create an **HTTP POST method** and link it to the `insertEmployeeData` Lambda function.

![step3b](steps/step3b.png)

3. Create an **HTTP GET method** and link it to the `GetEmployee` Lambda function.

![step3c](steps/step3c.png)

4. Enable **CORS** for **GET, POST, and OPTIONS** methods.

![step3d](steps/step3d.png)

5. Deploy the API and create a **Prod stage**.

![step3e](steps/step3e.png)

6. Copy the generated **API endpoint URL** and update it in `script.js`.

![step3f](steps/step3f.png)

### Step 4 - Create an S3 Bucket
1. Navigate to **S3** and create a new bucket.
2. Upload the **`index.html`** and **`script.js`** files to the bucket.

![step4a](steps/step4a.png)

### Step 5 - Create a CloudFront Distribution
1. Select **S3 bucket domain name** as the **origin domain**.
2. Create a new **Origin Access Control (OAC)**.

![step5a](steps/step5a.png)

3. Set **Default Root Object** to `index.html`.

![step5b](steps/step5b.png)

4. Update the **bucket policy** to allow CloudFront access.

![step5c](steps/step5c.png)

5. Once the CloudFront distribution is deployed, access your website using the CloudFront **distribution URL**.

![step5d](steps/step5d.png)

6. Verify the **POST and GET requests** to API Gateway.

![step5e](steps/step5e.png)

![step5f](steps/step5f.png)

### Step 6 - (Optional) Create a Route 53 Record
1. Navigate to **Route 53** and create an **A record** with alias pointing to **CloudFront Distribution**.

![step6a](steps/step6a.png)

2. Access the website using your custom domain (`devildevops.live`).

![step6b](steps/step6b.png)

3. Note: It may take a few hours for CloudFront to propagate changes to your domain.

---

## Conclusion
This project demonstrates a scalable **serverless** architecture on AWS using **CloudFront, S3, API Gateway, Lambda, and DynamoDB**. It provides a cost-effective and high-availability solution for hosting dynamic applications without managing infrastructure.

Feel free to contribute or raise issues in this repository!

---

## Repository Structure
```
/ (Project Root)
├── index.html         # Frontend HTML file
├── script.js          # JavaScript file for API calls
├── insertEmployeeData.py  # Lambda function for inserting data
├── GetEmployee.py         # Lambda function for fetching data
└── README.md          # Project documentation
```

### License
This project is open-source under the **MIT License**.

