// import { useForm } from "react-hook-form";

// export default function UserForm({ userObj = {} }) {
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         defaultValues: {...userObj}
//     });

//     const onSubmitHandler = (data) => {
//         console.log(data);
//     }
//     return (
//         <form onSubmit={handleSubmit(onSubmitHandler)} className="callback callback_banner clearfix">
//             <div className="form_content_wrapper">
//                 <h3 className="form_header">Безкоштовний розрахунок</h3>
//                 <p className="form_text">
//                     ЗАПОВНИ ФОРМУ ТА ОТРИМАЙ КОМПЛЕКСНУ КОНСУЛЬТАЦІЮ
//                 </p>

//                 Admin email
//                 <div className="input_wrapper clearfix">
//                     <div className="input_box">
//                         <input
//                         {...register("user_name", { required: true, maxLength: 5 })}
//                         className="reset"
//                         type="text"
//                         placeholder="Ім’я" />
//                         {<span className='error' role="alert">{errors.user_name?.type}</span>}
//                     </div>
//                     <div className="input_box">
//                         <input {...register("user_phone")} className="reset" type="tel" id="user_phone" placeholder="Номер телефону"
//                             required />
//                     </div>
//                     <div className="input_box">
//                         <input {...register("user_email")} className="reset" type="email" id="user_email" placeholder="Електронна адреса"
//                             required />
//                     </div>
//                     <div className="input_box">
//                         <select {...register("user_country")} id="user_country">
//                             <option value="0">Ваша країна</option>
//                             <option value="ukraine">Україна</option>
//                             <option value="belgium">Бельгія</option>
//                             <option value="usa">USA</option>
//                         </select>
//                     </div>
//                     <div className="input_box">
//                         <textarea {...register("user_message")} id="user_message" cols="30" rows="10" placeholder='Надіслати повідомлення'></textarea>
//                     </div>
//                 </div>
//             </div>
//             <div className="fg1">
//                 <button type="submit" className="sub_button btn">Надіслати</button>
//             </div>
//         </form>
//     );
// }