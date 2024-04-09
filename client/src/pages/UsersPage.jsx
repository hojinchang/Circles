import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";


import PageWrapper from "../components/wrappers/PageWrapper";
import { getUsers } from "../globals/utilityFunctions";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getUsers(setUsers, navigate, dispatch);
    }, []);

    return (
        <PageWrapper containerMaxWidth="max-w-4xl">
            <section>
                <h1 className="text-4xl font-bold">Users</h1>
                <hr className="mt-4 mb-8 border-neutral-400"/>
            </section>
            <section className="flex flex-wrap justify-center items-center gap-4">
                {users.length > 0 && users.map((user) => (
                    <div className="p-4">
                        <Link to={`/user/${user.id}`} className="group">
                            <img 
                            src={user.profilePicture} 
                            alt="Profile picture"
                            className="w-28 h-28 rounded-full mx-auto mb-2"
                            />
                            <div className="p-2 transition duration-200 group-hover:bg-neutral-200 rounded-lg">
                                <p className="font-medium text-center">{user.fullName}</p>
                                <p className="text-center text-neutral-500">{user.email}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>
            
        </PageWrapper>
    );
}

export default UsersPage;