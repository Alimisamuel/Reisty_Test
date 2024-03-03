import * as yup from "yup"

export const Schema = yup.object().shape({
    firstName:yup.string().required("Firstname Required"),
    surName:yup.string().required("Lastname Required"),
    email: yup.string().email("Please enter a valid email").required("Email Required"),
    phoneNumber:yup.number().required("Phone Number Required"),
restuarantName:yup.string().required("field can't be empty"),
// country: yup.string().required('Country is required'),
// category:yup.string().required('Category is required'),
// role:yup.string().required('Role is required'),
})
export const RegSchema = yup.object().shape({
  firstName: yup.string().required("Firstname Required"),
  lastName: yup.string().required("Lastname Required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email Required"),
  phoneNumber: yup.number().required("Phone Number Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*()_+{}[\]:;<>,.?~]/,
      "Password must contain at least one special character"
    )
    .test("no-common-password", "Common passwords are not allowed", (value) => {
      const COMMON_PASSWORDS = ["password", "123456", "qwerty", "abc123"];
      return !COMMON_PASSWORDS.includes(value.toLowerCase());
    })

    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});