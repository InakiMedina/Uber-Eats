const express = require("express");
const utils = require("./utils");

class ProductException {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

class Product {
  constructor() {
    this._uuid = utils.generateUUID()
  }
  //make the class equal a JSON
  setJson(json) {
    if (json.uuid) 
      this._uuid = json.uuid
    this.title = json.title;
    this.description = json.description;
    this.imageUrl = json.imageUrl;
    this.unit = json.unit;
    this.stock = json.stock;
    this.pricePerUnit = json.pricePerUnit;
    this.category = json.category;
    
  }

  toJson() {
    const json = {
      "uuid": this.uuid,
      "title": this.title,
      "description": this.description,
      "imageUrl": this.imageUrl,
      "unit": this.unit,
      "stock": this.stock,
      "pricePerUnit": this.pricePerUnit,
      "category":this.category
    }
    return json
  }

  static validateNewProduct(json) {
    const newProd = new Product()
    //validate by setting properties to a dummy
    newProd.setJson(json)
    if (json.uuid) newProd.uuid == json.uuid
  }

  static createFromJson(json, withUnderscore) {
    var output = new Product();
    output.setJson(json);
    return output;
  }

  static createFromObject(obj, withUnderscore) {
    var output = new Product();
    let cleanedObj = this.cleanObject(obj);
    let jsonObj = JSON.parse(JSON.stringify(cleanedObj));
    output.setJson(jsonObj);
    return output;
  }

  static cleanObject(obj) {
    const {
      title,
      description,
      imageUrl,
      unit,
      stock,
      pricePerUnit,
      category,
    } = obj;
    let cleanObj = {
      title,
      description,
      imageUrl,
      unit,
      stock,
      pricePerUnit,
      category,
    };
    return cleanObj;
    // if ('title' in obj)
    // 	newObj.title = obj.title
    // if ('description' in obj)
    // 	newObj.description = obj.description
    // if ('imageUrl' in obj)
    // 	newObj.imageUrl = obj.imageUrl
    // if ('unit' in obj)
    // 	newObj.unit = obj.unit
    // if ('stock' in obj)
    // 	newObj.stock = obj.stock
    // if ('pricePerUnit' in obj)
    // 	newObj.pricePerUnit = obj.pricePerUnit
    // if ('category' in obj)
    // 	newObj.category = obj.category

    //return newObj
  }

  //invalid public set uuid
  set uuid(uuid) {
    throw ProductException("Uuids cannot be set, they are autogenerated")
  }

  get uuid() {
    return this._uuid;
  }

  set title(title) {
    if (!title) {
      throw new ProductException("invalid title");
    } else this._title = title;
  }

  get title() {
    return this._title;
  }

  set description(description) {
    if (!description) {
      throw new ProductException("invalid description");
    } else this._description = description;
  }

  get description() {
    return this._description;
  }

  set imageUrl(imageUrl) {
    if (!imageUrl) {
      throw new ProductException("invalid tmageUrl");
    } else this._imageUrl = imageUrl;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  set unit(unit) {
    if (!unit) {
      throw new ProductException("invalid unit");
    } else this._unit = unit;
  }

  get unit() {
    return this._unit;
  }

  set stock(stock) {
    if (!stock || stock < 0) {
      throw new ProductException("invalid stock");
    } else this._stock = stock;
  }

  get stock() {
    return this._stock;
  }

  set pricePerUnit(pricePerUnit) {
    if (!pricePerUnit || pricePerUnit < 0) {
      throw new ProductException("invalid pricePerUnit");
    } else this._pricePerUnit = pricePerUnit;
  }

  get pricePerUnit() {
    return this._pricePerUnit;
  }

  set category(category) {
    if (!category) {
      throw new ProductException("invalid category");
    } else this._category = category;
  }

  get category() {
    return this._category;
  }
}

exports.Product = Product;
