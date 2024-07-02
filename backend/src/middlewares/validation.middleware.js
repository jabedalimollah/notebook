const signupValidation = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      statusInfo: "error",
      message: err.errors[0].message,
    });
    // ------------------ 1st ----------------
    // res.status(400).json({ stauts: 400, message: err.errors[0].message });

    // ------------------ 2nd ----------------
    // res.status(400).json({
    //   status: 400,
    //   message: err.errors[0].message,
    //   errorInfo: err.errors.map((curElm) => curElm.message),
    // });

    // ------------------ 3rd ----------------
    // next({ status: 400, statusInfo: "Error", message: err.errors[0].message });
  }
};

export { signupValidation };
