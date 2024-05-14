import { MAIL } from '../configs/config'
import { Civility } from '../constants/global.constant'
import { getMailContentByAct, translateActType } from '../helpers/util.helper'
import { IAct } from '../models/act.model'
import nodemailer from "nodemailer"

class MailService {

  private readonly transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: MAIL.SENDER_EMAIL,
      pass: MAIL.EMAIL_PASSWORD
    }
  })

  async sendConfirmationMail(actData: IAct) {

    const content = (
      `
        <table style="background-color: gray; color: white; padding: 8px; border-radius: 5px; border: 1px solid darkgreen;">
          <tr>
            <td>
              <div> Bonjour ${actData.actAddressInfo.civility === Civility.MALE ? 'monsieur' : 'madame' } ${actData.actAddressInfo.lastName}, </div>
              <div style="height: 8px;"> </div>
              <div> Votre demande d'acte de ${translateActType(actData.actType)} a été enregistrée avec succès. </div>
              <div style="height: 4px;"> </div>
              <div> <strong> Détails de l'acte : </strong> </div>
              <div style="height: 4px;"> </div>
              <div> format : ${actData.actAddressInfo.actFormat} </div>
              <div> ${getMailContentByAct(actData)} </div>
            </td>
          </tr>
        </table>
      `
    )

    // TODO : change name provisoire
    const mailOptions = {
      from: `"NOM PROVISOIRE" <${MAIL.SENDER_EMAIL}>`,
      to: actData.actAddressInfo.email,
      subject: "Demande d'acte Confirmée !",
      html: content
    }

    this.transporter.sendMail(mailOptions)
  }

}

export default new MailService()
