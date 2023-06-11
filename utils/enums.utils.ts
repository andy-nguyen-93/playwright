enum Account {
  INVALID = "invalid_user",
  STANDARD = "standard_user",
  PERFORMANCE_GLITCH = "performance_glitch_user",
  PROBLEM = "problem_user",
  LOCKED_OUT = "locked_out_user",
}

enum Password {
  ALL = "secret_sauce",
  INVALID = "invalid_password",
}

enum Message {
  LOGIN_FAIL = "Epic sadface: Username and password do not match any user in this service",
  LOCKED_OUT_LOGIN = "Epic sadface: Sorry, this user has been locked out.",
  ORDER_COMPLETE = "Thank you for your order!",
  ORDER_INFORMATION = "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
  REQUIRE_LASTNAME = "Error: Last Name is required",
  REQUIRE_LOGIN = "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  REQUIRE_LOGIN_FIRST = "Epic sadface: You can only access '",
  REQUIRE_LOGIN_LAST = "' when you are logged in.",
}

enum User {
  FIRSTNAME = "John",
  LASTNAME = "Calvin",
  POSTALCODE = "99501",
}

enum Url {
  INVENTORY = "/inventory.html",
  ITEM = "/inventory-item.html",
  CART = "/cart.html",
  CHECKOUT_ONE = "/checkout-step-one.html",
  CHECKOUT_TWO = "/checkout-step-two.html",
  CHECKOUT_COMPLETE = "/checkout-complete.html",
}

enum Site {
  SAUCE_LAB = "https://saucelabs.com/",
  SAUCE_DEMO = "https://www.saucedemo.com/",
}

enum Txt {
  LOGO = "Swag Labs",
}

enum Sort {
  NAME_ASC = "Name (A to Z)",
}

export { Account, Password, Message, User, Url, Site, Txt, Sort };
