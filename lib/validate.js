export default function login_validate(values){
    const errors = {};


    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }


      //validation for password
      if (!values.password) {
        errors.password = 'Required';
        } else if (values.password.length < 8 || values.password.length > 20) {
            errors.password = 'Password must be at least 8 and less than 20  characters';
        }else if(values.password.includes(" ")){
            errors.password = 'Password must not contain blank spaces';
        }
        return errors;

}

export  function Register_validate(values){
    const errors = {};

// validate for username

    if (!values.Username) {
        errors.Username = 'Required';
      } else if (values.Username.includes(" ")) {
        errors.Username = 'Invalid Username...!';
      }
// validate for email

    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }


//validation for password
      if (!values.password) {
        errors.password = 'Required';
        } else if (values.password.length < 8 || values.password.length > 20) {
            errors.password = 'Password must be at least 8 and less than 20  characters';
        }else if(values.password.includes(" ")){
            errors.password = 'Password must not contain blank spaces';
        }


//validation for confirm password
        if (!values.cpassword) {
            errors.cpassword = 'Required';
            } else if (values.cpassword!==values.password) {
                errors.cpassword = 'Password not Matched';
            }else if(values.cpassword.includes(" ")){
                errors.cpassword = 'invalid conform password';
            }

        return errors;




}