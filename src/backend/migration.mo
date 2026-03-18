import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
  };

  type OldActor = {
    coats : Map.Map<Nat, Product>;
    contactSubmissions : Map.Map<Nat, ContactSubmission>;
    nextContactId : Nat;
  };

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

  type NewActor = {
    cars : Map.Map<Nat, Car>;
    inquiries : Map.Map<Nat, Inquiry>;
    nextInquiryId : Nat;
  };

  public func run(_old : OldActor) : NewActor {
    let cars = Map.empty<Nat, Car>();
    let inquiries = Map.empty<Nat, Inquiry>();
    let nextInquiryId = 1;
    { cars; inquiries; nextInquiryId };
  };
};
