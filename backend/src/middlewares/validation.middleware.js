const userValidation = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      statusInfo: "fail",
      message: err.errors[0].message,
      data: null,
    });
    // ------------------ 1st ----------------
    // res.status(400).json({ stauts: 400, response: err.errors[0].message });

    // ------------------ 2nd ----------------
    // res.status(400).json({
    //   status: 400,
    //   response: err.errors[0].response,
    //   errorInfo: err.errors.map((curElm) => curElm.response),
    // });

    // ------------------ 3rd ----------------
    // next({ status: 400, statusInfo: "Error", response: err.errors[0].response });
  }
};

export { userValidation };
