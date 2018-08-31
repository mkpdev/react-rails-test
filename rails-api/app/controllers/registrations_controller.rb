class RegistrationsController < DeviseTokenAuth::RegistrationsController
  # Used devise token auth to manage authentication between react application and rails application.

  # Strong params for signup
  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :role)
  end

end