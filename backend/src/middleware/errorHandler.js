
export function errorHandler(err, req, res, next) {
  
  console.error('Error occurred:', err);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors,
    });
  }

  
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `Duplicate entry for ${field}. This value already exists.`,
    });
  }

  
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}. Please provide a valid ID format.`,
    });
  }

  
  if (err.type === 'StripeCardError') {
    return res.status(400).json({
      success: false,
      message: err.message || 'Card error occurred',
    });
  }

  
  if (err.type === 'StripeInvalidRequestError') {
    return res.status(400).json({
      success: false,
      message: err.message || 'Invalid request to Stripe',
    });
  }

  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please authenticate again.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired. Please authenticate again.',
    });
  }

  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  
  const errorResponse = {
    success: false,
    message: message,
  };

  
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  return res.status(statusCode).json(errorResponse);
}
