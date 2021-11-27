## Tour Screen

-Receives admin link if a linkis used to open the App
-General description of how the app works

## Login

-Google login
-Facebook login
-Email & Password login
-Finger Authentication
-Options to (Register or Forgot password )

- The system will pick which Account the user is registered with
  either Admin / Client / Worker Acccoun based on the object returned frm database upon success registration
-

## Profits

- 1. week number
- 2. From Date to Date (Weekly Period) (adding 7 days to moment)
- 3. Overal Week Profit
- 4. Each Daily Delivery & order Number & items (Array)
- 5. Each Weekly Delivery & order Number & items (Array)
- 5. Expense & Losses

  ## Monthly Summary

  ## Weekly Summary

  ## Recent Summary (Today and last less 7 days)

      - Timestamp
      - Weekly Analysis
        ** Daily Deliveries (Profit) **
        ** Weekly Deliveries (Profit) **
        ** Expenses & Lossess (Amounts) **

        Requirements
        name
        mass
        quantity
        amount
        buyingPrize
        SellingPrize

        totalBuyingAmount,
      totalSellingAmount,
      totalItems,

## Add Products

    - productName
    - brand
    - Incase
    - salePrice
    - regularPrice
    - buyingPrice
    - barcode
    - productURI
    - catalogVisibility
    - category
    - mass
    - user * fullName *id

## bug category.trim().replace(/['"]+/g, ''),

to be solved

## Create Order

- adminID
- createAt
- invoice
- month
- orderNumber
- type
- productsData
- seen(false)
- status(Pending)
- totalAmount
- totalItems
- userCategory
- userId
- fullName
- email
- mobile

## Write Stock

totalItems
totalAmount
createAt
orderNumber
invoice
userId
fullName
mobile
userCategory
orderType
month
metadata: {
adminID,
adimFullName,
shopID,
storeType,
shopName,
},

type

productsData

- id
- name
- value
- salePrice
- buyingPrice
- mass
- amount



## Selling Amount
   - selling goods
   - stock taking
   - expenses (record with selling amount)
   - losses (record with selling amount)
   - profit calculation
  
## Buying Amount

  - Write Stock
  - Deliveries


## Record Delivered Stock

             
We have 6 types to select from

1) Bulk Delivered Stock (***1)
2) Meat                   ++++
3) Airtime                ----
4) Drinks                (***2)
5) Bread                 (***3)
6) Add new products      (***4)


1) ****Bulk Delivered Stock*****Drinks*****Bread*****Add new products*****
 products: 
          name
          mass
          quantity
          amount
          buyingPrice
          salePrice
          isSelected
          includingVat
          excludingVat
          count
          vat
          key
statistics:
          totalBuyingAmount
          totalSellingAmount
          totalItems
type 

2) +++++++++++++++++ Meat ++++++++++++++++++++++++++++++++++++++++++++++++key:keyGenerator()
products: 
          name
          mass
          amount
          count  
          quantity
          buyingPrice
          salePrice
          key
statistics:
          totalBuyingAmount
          totalSellingAmount
          totalItems
type 

3) ---------------- Airtime --------------------------------------------

products: 
        name:   airtime
        amount
        quantity
        key
statistics:
          totalBuyingAmount
          totalSellingAmount
          totalItems
type 




         1) We need to get the statistics to calculate profit
         2) Products from were we calculated
         3) type of record is



           
