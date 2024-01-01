deploy 網址：wp1121-sage.vercel.app

deploy 版本測試用帳密：
帳號：hbs419030@gmail.com
密碼：abcd1234

local 運作方法：
1. cd wp_fp_gambling 
2. yarn
3. cp .env.example .env
4. cp .env.local.example .env.local
5. docker-compose up -d
6. yarn migrate
7. yarn dev

因為我們是做賭博網站，所以是設計成每天晚上午夜自動更新。因此本地端為了可以測試，請滑到主頁最下方，在左下角有一個 Click 的按鈕，點擊後會自動抓取資料。請點擊後重新整理頁面，即可看到新出來的賭博合約。

另外，這個網站有一些前端的小 bug，像是money等等的，需要重新整理才會更新。

