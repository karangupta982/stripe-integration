
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


export function validateOrder(req, res, next) {
  const { customerEmail, items, totalAmount } = req.body;

  
  if (!customerEmail) {
    return res.status(400).json({
      success: false,
      message: 'Customer email is required',
    });
  }

  
  if (!validateEmail(customerEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format',
    });
  }

  
  if (!Array.isArray(items)) {
    return res.status(400).json({
      success: false,
      message: 'Items must be an array',
    });
  }

  
  if (items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Items array cannot be empty',
    });
  }

 
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    
    if (!item.name) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} is missing 'name' field`,
      });
    }

    
    if (item.price === undefined || item.price === null) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} is missing 'price' field`,
      });
    }

    
    if (typeof item.price !== 'number' || item.price <= 0) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} has invalid price. Price must be a positive number`,
      });
    }

   
    if (!item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} is missing 'quantity' field`,
      });
    }

   
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} has invalid quantity. Quantity must be a positive number`,
      });
    }
  }

  
  if (totalAmount === undefined || totalAmount === null) {
    return res.status(400).json({
      success: false,
      message: 'Total amount is required',
    });
  }

  
  if (typeof totalAmount !== 'number' || totalAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Total amount must be a positive number',
    });
  }

 
  next();
}
