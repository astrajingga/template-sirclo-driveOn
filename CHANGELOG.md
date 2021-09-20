# Change Log

All notable changes to SIRCLO's Template Merlin will be documented in this file.

# release-20210819

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/2.0.1) version 2.0.1

### Bug fixes
* placeOrder set email if member doent hv email
* storybook remove unused code
* handle redirect priority
* dicrect-checkout fix kekeliruan boolean directCheckout
* estimate-shipping fix lazy load image provider
* fetchGql error handling fetchGQL
* optin handle bug
* place-order make revamped map UI optional
* handle undefined getbrand
* remove enum
* withbrand prettify

### Features
* banner Add Banner Storybook Component
* add WA OTP setting hooks
* prevent autofill on checkout & account
* banner add SSR Banner
* map revamp map UI
* notification integration notifications
* otp complete flow otp login
* otp update mutation request otp
* add notification opt in UI
* revamp place order information
* sb-account restructure storybook account - history with table
* WA-OTP handle request otp
* add whatApp OTP UI
* adjust WA OTP UI
* theme setting context

# release-20210803

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.12.1) version 1.12.1

### Bug fixes
* Direct to place order for all case
* Coupon can't add & remove if not logged in
* Coupon no coupon output 0 because && conditional
* Products handle membershipModelID
* Products handle membershipModelID
* AddToCart fix onError AddtoCart
* Payment confirmation image type validation
* Product fix no resource and handle catch on complete product / fix product recomendation
* Product detail toggle product reviews visibility based on web setting
* Product flipped logic for ProductTitle
* Product remove suffix ‘Single Variant’
* Product return totalItems on get product crossell
* Apollo cache normalization and invalidation
* Navigation unescape special characters
* Add missing key fields (ID)

### Features
* Direct to placeorder after login register
* Product detail toggle product reviews visibility based on web setting
* ProductDetailv2 add EstimateShipping

# release-20210719

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.11.5) version 1.11.5

### Bug fixes
* Coupon handle submit if coupon bundle is applied
* Coupon hide promo bundle code if applied with another promo + handle coupon price breakdown
* Estimate shipping remove unused props and fix unload image
* NexusImage reset lazyload class if src is updated
* Order summary calculate total cart
* Order summary update totalCost after every cart query
* WYSIWYG image width, height, and src
* Product fixing fetch policy filter variant
* Update api key
* Order review handle review by order token/guest
* Placeorder return member cart on PlaceOrderFormHelper
* Product detail persist 2nd variant on 1st variant change
* PrivateRoute add usecallback on handleDirection page

### Features
* Privateroute add debounce oncomplete getTotalItems
* SSO add on error sso and import to index component MaintenanceMode
* WYSIWYGConverter exclude append script on script button io
* SSO add loading component & flagging is mobile on facebook login

# release-20210702

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.10.16) version 1.10.16

### Bug fixes
* Navigation update fetch policy
* Product detail remove membership error on errorComponent
* Product detail update fetch-policy and add membershipModelID for ProductDetailv2
* Thumbor webp validation on safari
* Order history Remapping unpaid and confirming status
* Product category image thumbor config not applied
* Add width & height on all image components
* Banner improvement & lazy load on image & thumbor
* Button classname addToCart for support tiktok pixel 
* Product filter filter variant not updated
* Products add default value for item per page
* Products filter conflicts with url param
* withBrand fix getCart on withBrand
* Refetch undefined result from safari
* WYSIWYG remove thumbor
* Payment bank transfer redirect
* Fix pathname router
* Add retry link apollo & fix refetch method
* Account fix handleButtonDelivered
* Add retry link apollo & fix refetch method

### Features
* Brand add googleAdsWebsiteMetaToken
* Product detail qty di PDP negatif
* Account add hooks to getCustomerInformation & getAddressByCartID
* Account add hooks useCustomerInformation
* Artciles add hooks getArticles
* Helpers add getBlogs and getAllowedActions helpers
* Cart handle skip getCart and add emptyStateComponent

# release-20210623

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.9.10) version 1.9.10

### Bug fixes
* Coupon add loading component for cart summary
* Hide WA option
* Coupon add membershipModelID
* Coupon coupon and points loading component
* Payment link generated twice in a single query
* Payment selected payment method validation
* Product Category add href on Product Category
* Variant fix default value variant
* Logistix Field set default value location list
* Thumbor & Newsletters convert content img to thumbor & add props thumborSetting on Newsletters component
* Order Review fix counting character of review
* Shipping Methods: conditional i18n for set pinpoint
* Account fix function button Delivered

### Features
* Account add loading and empty state component
* Ordersummary fix onSaveCartError
* Shipping Methods mapping error shippingCostEstimation
* Account add order status completed & handle confirmation order to completed
* Account add status cancelled
* Estimate Shipping add image provider

# release-20210602

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.9.6) version 1.9.6

### Bug fixes
* Login issue
* Navigation update limit navigation to 500 items
* Revert fix (apolloClient) fix URL graphql fqdn
* Account date of birth select
* Instagram-feed add alt text and fix loading state
* Order-summary add shipping cost breakdown
* Order-summary shipping cost breakdown on cart and place_order page
* Product-detail show membership discount price
* Products type error
* Register fix register redirect
* FormatDate helper

### Features
* Allow function lookbook
* Pagination disable spacer pointer-event
* Pagination limit page numbers
* Products show membership discount
* Register handle auto login after register

# release-20210510

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.9.1) version 1.9.1

### Bug fixes

* Hide product detail if published status is false
* Shipment tracker in order history table
* Handle payment link error
* Handle popup on retry
* Handle warning payment limit
* Clear search query on category select
* Refetch products with query

# release-20210430

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.8.29) version 1.8.29

### Bug fixes

* Membership
* Product category dropdown icon click handler
* Payment handle popup on retry
* Products clear search query on category select

### Features

* Handle escape blog and article
* Product cards add tagnames props
* Product detail handle some object to escape special character
* Widget add hash for recurring script

# release-20210423

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.8.25) version 1.8.25

### Bug fixes

* Image loading service per variant
* Section hidden cross sell
* Change thank you & payment status url
* Improve redirect to default language, can handle more than 1 uri segment
* Membership History
* Use point webstore on step checkout

### Features

* Google SSO Login
* Tautan / Links
* Allow function policy
* Product bundling
* Notify Me

# release-20210409

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.8.11) version 1.8.11

### Bug fixes

* fix cart handle disable button add and minus when loading
* fix calculation shipping coupon
* fix disabled if shipping.isEnable false && shipping is instant or sameday
* fix disabled shipping condition
* fix styling shipment tracking
* fix styling birthdate on account page

### Features

* Product review and ratings
* Product recommendation
* Coupon
* Shipping method instant courier
* Shipment tracking
* Discount line items in cart
* Line items error in cart
* Blog
* Shipment tracking

# release-20210305

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.4.14) version 1.4.14

### Bug fixes

* Fix pagination in product list
* Fix cart ignore stock
* Fix multiple order, when brute-force click pay button
* Fix missing SEO data
* Fix height product detail image

### Features

* Pin point location in account and place order
* Filter & sort enhancement 
* Total tagihan in payment confirmation

# release-20210115

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.2.0) version 1.2.0

### Bug fixes

* Fix keypress on login & register form

### Features

* Hide strength level password, display when on focus
* Add payment status page on payment gateway end journey

# release-20201231

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.1.0) version 1.1.0

### Bug fixes

* Fix banner link styling
* Fix discount price on cart
* Fix image category fallback
* Fix change password error
* Fix invoice link and input amount field on payment confirmation

### Features

* Ignore Stock
* Move cart using BE API
* Password validation
* Tag name badge & support validation
* Pagination order history
* Testimonials with carousel
* Hide blog features (unfinished feature)

# release-20201222

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.7.23) version 0.7.23

### Features

* Fix invalid token

# release-20201207

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.7.21) version 0.7.21

### Features

* Order history list and details

# release-20201202

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.7.21) version 0.7.21

### Bug fixes

* Fix double bank transfer payment method
* Fix can't proceed to cart after add to cart product

# release-20201125

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.7.11) version 0.7.11

### Bug fixes

* Fix broken image categories
* Fix empty cart after add to cart
* Remove copy content error when banner is empty
* Fix imageFallback for broken image categories

### Features

* Open order
* Contact us
* Social media icon

# release-20201111

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.4.44) version 0.4.44

### Bug fixes

* Fix member order history
* Fix logout remove authentication
* Hotfix unfinished features (on backend), social media icon and isExpired

### Features

* Newsletter pop up
* Header announcements
* Displaying information when product couldn't be found

# release-20201012

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.4.28) version 0.4.28

### Bug fixes

* Fix error blank on register page
* Fix error unrecognized active lang on 404 page
* Fix ui bugs, password hide icon
* Fix bugs reset password
* Fix item quantity count, that sometime make the website freeze

### Features

* Discount price on products and payment details
* Hide premium features
* Maintenance mode
* Page transitions

# release-20201001

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.4.2) version 0.4.2

### Bug fixes

* Badge total item to become quantity item
* Label point in popup order summary
* Private route for checkout flow
* Disable toggle cart pop up on cart page and place order
* Hide button voucher and points in order summary
* Hide shortcut in Cart, and Placeorder pages
* Hide footer in Cart, and Placeorder pages only for mobile version
* Hide Quickview in mobile version
* Hide enquiry form (Subscribe newsletter)
* Redirect to cart when order placed

### Features

* Empty state and 404 error page
* Search feature
* Gift card page

# release-20200924

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.3.1) version 0.3.1

### Bug fixes

* Remove graphql uri in next config

### Features

* Set limit for product category in homepage
* Popup points

## release-20200923

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.3.1) version 0.3.1