import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'


const SignInPage = () => {

    const [searchParams] = useSearchParams()
    const redirectUrl = searchParams.get('redirect')

    const redirect = redirectUrl ? redirectUrl : '/'

    console.log(redirectUrl)

    return (
        <div>
            <div className="card m-auto" style={{ 'maxWidth': '30rem' }}>
                <div className="card-body">
                    <h3 className="card-title">Sign In</h3>
                    <form>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>

                        <div className='mb-3'>
                        <button type="submit" class="btn btn-warning">Sign In</button>
                        </div>

                        <div className='mb-3'>
                            New Customer?{' '}
                        <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage