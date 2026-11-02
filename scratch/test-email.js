import nodemailer from "nodemailer";
import { getMobileAppRequiredEmailHtml, getMobileAppRequiredEmailPlainText } from "../src/services/email-templates.service.js";

const transporter = nodemailer.createTransport({
    host: "email-smtp.eu-north-1.amazonaws.com",
    port: 587,
    secure: false, 
    auth: {
        user: "AKIAWWASONJMRGBES4VH",
        pass: "BIjJ4627blCsiTQxQKvQQrrySwc457/kBzKJilr8Ixd+"
    }
});

const sendTestEmail = async () => {
    try {
        const html = getMobileAppRequiredEmailHtml("Nikhil Shinde");
        const text = getMobileAppRequiredEmailPlainText("Nikhil Shinde");

        const info = await transporter.sendMail({
            from: '"Classgrid" <support@classgrid.in>',
            to: "nikhilsubsun123@gmail.com",
            subject: "Action Required: Download Classgrid App",
            html: html,
            text: text
        });

        console.log("Email sent successfully: ", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

sendTestEmail();
