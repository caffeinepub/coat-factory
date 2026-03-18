import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Car = {
    id : Nat;
    make : Text;
    model : Text;
    year : Nat;
    priceUSD : Nat;
    category : Text;
    horsepower : Nat;
    engine : Text;
    description : Text;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    carId : Nat;
    timestamp : Int;
  };

  let cars = Map.fromIter<Nat, Car>(
    [
      (
        1,
        {
          id = 1;
          make = "BMW";
          model = "7 Series";
          year = 2023;
          priceUSD = 95000;
          category = "Luxury Sedan";
          horsepower = 530;
          engine = "4.4L V8";
          description = "The BMW 7 Series combines luxury, technology, and power in a sophisticated sedan package.";
        },
      ),
      (
        2,
        {
          id = 2;
          make = "Mercedes-Benz";
          model = "S-Class";
          year = 2023;
          priceUSD = 105000;
          category = "Luxury Sedan";
          horsepower = 496;
          engine = "4.0L V8";
          description = "The flagship Mercedes S-Class offers the ultimate in luxury, comfort, and cutting-edge features.";
        },
      ),
      (
        3,
        {
          id = 3;
          make = "Tesla";
          model = "Model S Plaid";
          year = 2023;
          priceUSD = 135000;
          category = "Electric";
          horsepower = 1020;
          engine = "Electric AWD";
          description = "Tesla's Model S Plaid boasts incredible performance, acceleration, and a high-tech interior.";
        },
      ),
      (
        4,
        {
          id = 4;
          make = "Lexus";
          model = "LS 500";
          year = 2023;
          priceUSD = 89000;
          category = "Luxury Sedan";
          horsepower = 416;
          engine = "3.5L V6 Twin-Turbo";
          description = "The Lexus LS 500 blends Japanese craftsmanship with modern technology and a quiet ride.";
        },
      ),
      (
        5,
        {
          id = 5;
          make = "Porsche";
          model = "Panamera Turbo S";
          year = 2023;
          priceUSD = 180000;
          category = "Luxury Sport";
          horsepower = 620;
          engine = "4.0L V8 Turbo";
          description = "Porsche's Panamera Turbo S delivers sports car performance in a luxury sedan package.";
        },
      ),
      (
        6,
        {
          id = 6;
          make = "Audi";
          model = "A8 L";
          year = 2023;
          priceUSD = 94000;
          category = "Luxury Sedan";
          horsepower = 335;
          engine = "3.0L V6";
          description = "The Audi A8 L offers spacious luxury, advanced driver assistance, and refined performance.";
        },
      ),
      (
        7,
        {
          id = 7;
          make = "Genesis";
          model = "G90";
          year = 2023;
          priceUSD = 79000;
          category = "Luxury Sedan";
          horsepower = 385;
          engine = "3.3L V6 Twin-Turbo";
          description = "Genesis G90 presents high-end luxury features at a competitive price point.";
        },
      ),
      (
        8,
        {
          id = 8;
          make = "Jaguar";
          model = "XJ";
          year = 2022;
          priceUSD = 86000;
          category = "Luxury Sedan";
          horsepower = 575;
          engine = "5.0L V8";
          description = "Jaguar XJ combines British luxury with sporty handling and bold design.";
        },
      ),
    ].values(),
  );

  var nextInquiryId = 1;
  let inquiries = Map.empty<Nat, Inquiry>();

  public query ({ caller }) func getCars() : async [Car] {
    cars.values().toArray();
  };

  public query ({ caller }) func getCar(id : Nat) : async ?Car {
    cars.get(id);
  };

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text, carId : Nat, timestamp : Int) : async Nat {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      email;
      message;
      carId;
      timestamp;
    };
    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    inquiry.id;
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };
};
