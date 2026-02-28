import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  let coats = Map.fromIter<Nat, Product>(
    [
      (
        1,
        {
          id = 1;
          name = "Wool Overcoat";
          description = "Classic wool overcoat for winter.";
          price = 249.99;
          category = "Winter";
          imageUrl = "https://example.com/wool-overcoat.jpg";
        },
      ),
      (
        2,
        {
          id = 2;
          name = "Puffer Jacket";
          description = "Warm and lightweight puffer jacket.";
          price = 189.95;
          category = "Winter";
          imageUrl = "https://example.com/puffer-jacket.jpg";
        },
      ),
      (
        3,
        {
          id = 3;
          name = "Trench Coat";
          description = "Stylish classic trench coat.";
          price = 229.5;
          category = "Classic";
          imageUrl = "https://example.com/trench-coat.jpg";
        },
      ),
      (
        4,
        {
          id = 4;
          name = "Peacoat";
          description = "Navy style wool peacoat.";
          price = 199.0;
          category = "Classic";
          imageUrl = "https://example.com/peacoat.jpg";
        },
      ),
      (
        5,
        {
          id = 5;
          name = "Parka";
          description = "Water-resistant winter parka.";
          price = 269.95;
          category = "Winter";
          imageUrl = "https://example.com/parka.jpg";
        },
      ),
      (
        6,
        {
          id = 6;
          name = "Bomber Jacket";
          description = "Sporty bomber jacket.";
          price = 149.95;
          category = "Sport";
          imageUrl = "https://example.com/bomber-jacket.jpg";
        },
      ),
      (
        7,
        {
          id = 7;
          name = "Camel Coat";
          description = "Elegant camel-colored coat.";
          price = 279.99;
          category = "Classic";
          imageUrl = "https://example.com/camel-coat.jpg";
        },
      ),
      (
        8,
        {
          id = 8;
          name = "Raincoat";
          description = "Lightweight waterproof raincoat.";
          price = 99.95;
          category = "Casual";
          imageUrl = "https://example.com/raincoat.jpg";
        },
      ),
    ].values(),
  );

  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  var nextContactId = 1;

  // Product Queries
  public query ({ caller }) func listCoats() : async [Product] {
    coats.values().toArray().sort();
  };

  public query ({ caller }) func getCoatByCategory(category : Text) : async [Product] {
    coats.values().toArray().sort().filter(
      func(coat) { Text.equal(coat.category, category) }
    );
  };

  public query ({ caller }) func getCoatById(id : Nat) : async Product {
    switch (coats.get(id)) {
      case (null) { Runtime.trap("Coat id " # id.toText() # " does not exist.") };
      case (?coat) { coat };
    };
  };

  // Contact Form Submission
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text, timestamp : Int) : async Nat {
    let contact : ContactSubmission = {
      id = nextContactId;
      name;
      email;
      message;
      timestamp;
    };
    contactSubmissions.add(nextContactId, contact);
    let submittedId = nextContactId;
    nextContactId += 1;
    submittedId;
  };
};
