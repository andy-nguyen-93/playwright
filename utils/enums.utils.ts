enum Account {
  INVALID = "invalid_user",
  STANDARD = "standard_user",
  PERFORMANCE_GLITCH = "performance_glitch_user",
  PROBLEM = "problem_user",
}

enum Password {
  ALL = "secret_sauce",
  INVALID = "invalid_password",
}

enum Message {
  LOGIN_FAIL = "Epic sadface: Username and password do not match any user in this service",
  ORDER_COMPLETE = "Thank you for your order!",
  ORDER_INFORMATION = "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
  REQUIRE_LASTNAME = "Error: Last Name is required",
  REQUIRE_LOGIN = "Epic sadface: You can only access '/inventory.html' when you are logged in.",
}

enum User {
  FIRSTNAME = "John",
  LASTNAME = "Calvin",
  POSTALCODE = "99501",
}

enum Url {
  INVENTORY = "https://www.saucedemo.com/inventory.html",
}

export { Account, Password, Message, User, Url };
