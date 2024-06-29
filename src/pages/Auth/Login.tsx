import { useForm } from 'react-hook-form';
import instance from '../../axios';
import { useNavigate } from 'react-router-dom';
import IUser from '../../interfaces/IUser';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

export default function Login() {
    const {  dispatchUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IUser>();

    const onSubmit = async (value: IUser) => {
        (async () => {
            try {
                const res = await instance.post(`/login`, value);
                if (res.status == 200) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    dispatchUser({
                        type: 'login'
                    })  
                    alert('Đăng nhập thành công')
                    navigate('/')
                }
            } catch (error) {
                alert("Tài khoản không tồn tại")
            }
        })();
    }

    return (
        <div className="mt-[100px]">
            <h4 className="w-[120px] mx-auto text-center py-1 text-white rounded bg-gray-800">Login</h4>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                    <input type="email" {...register('email', {
                        required: "Vui lòng nhập vào email",
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Email không đúng định dạng"
                        }
                    })} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" />
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span>{errors?.email?.message}</p>
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
                    <input type="password" {...register('password', {
                        required: "Không được để trống password",
                        minLength: {
                            value: 6,
                            message: "Password lớn hơn 6 kí tự"
                        }
                    })} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span>{errors?.password?.message}</p>
                </div>
                <button type="submit" className="text-white bg-blue-700 mt-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>
        </div>
    )
}