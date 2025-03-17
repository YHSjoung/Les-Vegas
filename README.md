# WP1121 FinalProject Group

This application offers a simulated gambling experience with three main types of games.

### 1. NBA Games

Choose which team you think will win. Successful bets will reward you with coins.

### 2. Wheather Predict

Predict the weather outcome. Coins are awarded for correct predictions.

### 3. Marketing Index Predict

Place your bet on whether you believe a selected stock market index will rise or fall.


## Set Up

* First, navigate to the `wp_fp_gambling` directory to set up the `.env.local`.env.local and `.env` files:

```bash
cd wp_fp_gambling
cp .env.examle .env
cp .env.local.example .env.local
```

* Second, to install the dependencies:
````bash
yarn
````

* Next, set up the database:
````bash
docker-compose up -d
yarn migrate
````

* Finally, launch the development server:

```bash
yarn dev
```

Additionally, our deployed domain is available at [wp1121-sage.vercel.app](wp1121-sage.vercel.app). A test account is provided for convenience

   | Account | Password |
   |---|---|
   | hbs419030@gmail.com | abcd1234 |
   
As our website simulates a gambling environment, it is designed to update automatically every evening at midnight. For local testing and to fetch the latest gambling contracts, please scroll to the bottom of the main page and click the "Click" button in the bottom-left corner. After clicking, refresh the page to see the newly available gambling contracts.

