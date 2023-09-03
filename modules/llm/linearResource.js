class LinearResource {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  //Check if a quantity of resource is available
  checkQuantity(requiredQty) {
    return this.quantity >= requiredQty;
  }

  //Acquire a quantity of resource
  acquire(requiredQty) {
    if (this.checkQuantity(requiredQty)) {
      this.quantity -= requiredQty;
      return requiredQty;
    } else {
      throw new Error(`Insufficient available quantity of the resource: ${this.name}`);
    }
  }

  //Add a quantity of resource
  add(addedQty) {
    this.quantity += addedQty;
    return this.quantity;
  }

  //Apply an operation by consuming a quantity of resource
  applyOperation(operation, requiredQty) {
    let acquiredQty = this.acquire(requiredQty);
    try {
      return operation(acquiredQty);
    } catch (err) {
      this.add(acquiredQty); //rollback if operation fails
      throw err;
    }
  }
}

module.exports = LinearResource;