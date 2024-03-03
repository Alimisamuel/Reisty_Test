import * as yup from "yup";

export const BasicInfo = yup.object().shape({
  restuarantName: yup.string().required("field can't be empty"),
  adminsFullName: yup.string().required(" Required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email Required"),
  restuarantWebsite: yup.string().required(" Required"),
  phoneNumber: yup.number().required("Phone Number Required"),
  // address: yup.string().required("field can't be empty"),
  description: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .required("field can't be empty"),
});





// export const RegSchema = yup.object().shape({
//   firstName: yup.string().required("Firstname Required"),
//   lastName: yup.string().required("Lastname Required"),
//   email: yup
//     .string()
//     .email("Please enter a valid email")
//     .required("Email Required"),
//   phoneNumber: yup.number().required("Phone Number Required"),
//   password: yup
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/\d/, "Password must contain at least one number")
//     .matches(
//       /[!@#$%^&*()_+{}[\]:;<>,.?~]/,
//       "Password must contain at least one special character"
//     )
//     .test("no-common-password", "Common passwords are not allowed", (value) => {
//       const COMMON_PASSWORDS = ["password", "123456", "qwerty", "abc123"];
//       return !COMMON_PASSWORDS.includes(value.toLowerCase());
//     })

//     .required("Password is required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });
