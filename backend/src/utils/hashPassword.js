import bcrypt from "bcrypt";

const encryPassword = async (password) => {
  // if (!this.isModified("password")) {
  //     return next();
  //   }
  try {
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    return (password = hashedPassword);
  } catch (error) {
    return next(error);
  }
};

export { encryPassword };
