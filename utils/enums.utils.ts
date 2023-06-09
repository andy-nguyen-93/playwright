enum Account {
  INVALID = "invalid_user",
  STANDARD = "standard_user",
  PERFORMANCE_GLITCH = "performance_glitch_user",
}

enum Password {
  ALL = "secret_sauce",
  INVALID = "invalid_password",
}

enum Message {
  LOGIN_FAIL = "Epic sadface: Username and password do not match any user in this service",
  ORDER_COMPLETE = "Thank you for your order!",
  ORDER_INFORMATION = "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
}

enum User {
  FIRSTNAME = "John",
  LASTNAME = "Calvin",
  POSTALCODE = "99501",
}

export { Account, Password, Message, User };
