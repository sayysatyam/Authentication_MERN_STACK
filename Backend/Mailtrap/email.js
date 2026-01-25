const {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE,WELCOME_EMAIL_TEMPLATE} = require("../Mailtrap/emailTemplate");

const {mailtrapClient,sender} = require("../Mailtrap/mailtrap");

const sendVerificationEmail = async(email,verificationToken)=>{
    try {
    const response = await mailtrapClient.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email, 
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });

    console.log("Email sent successfully", response.messageId);
  } catch (err) {
    console.error("Error sending verification", err);
    throw err;
  }
};
const sendWelcomeEmail = async(email,userName)=>{
    try {
    const response = await mailtrapClient.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email, 
      subject: `Welcome From Satyam`,
      html: WELCOME_EMAIL_TEMPLATE.replace(
        "{name}",
        userName
      ),
    });

    console.log("Email sent successfully", response.messageId);
  } catch (err) {
    console.error("Error sending verification", err);
    throw err;
  }
}
const sendPasswordResetEmail = async(email,resetlink)=>{
        try{
                const response = await mailtrapClient.sendMail({
                    from:sender,
                    to:email,
                    subject:"Reset Your Password",
                    html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetlink),
                })
        }
        catch(error){
            console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
        }
};
 const sendResetSuccessEmail = async (email) => {
	const recipient = email;

	try {
		const response = await mailtrapClient.sendMail({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
module.exports = {sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail};

