class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authenticate_admin!

  # List all users
  # Filter users by name
  # Filter users by search query.
  # List users based on pagination.
  def index
    @users = User.all
    @users = User.where("name LIKE ? OR email LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%") if params[:search].present?
    @users = @users.where(role: params[:filter_by_role]).paginate(page: params[:page], per_page: 10) if params[:filter_by_role].present?
    @users = @users.paginate(page: params[:page], per_page: 10)
         
    render json: { users: @users, total_pages: @users.total_pages }
  end

  # Return single user record by id.
  def show
    render json: @user
  end

  # Create new user record using user_params entered by admin and generate random password.
  # Return errors if any error occur during saving user data.
  # Enhancement: We can send password via email.  
  def create
    @user = User.new(user_params)
    @user.password = SecureRandom.hex(8)
    if @user.save
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Update user record using user_params entered by admin.
  # Return errors if update is failed.
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # Delete user record of given id provided by admin dashboard.
  # Return errors if destroy is failed.
  def destroy
    @user.destroy
    if @user.destroy
      head :no_content, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # Define strong parameters for user.
  def user_params
    if current_user.admin?
      params.require(:user).permit(:email, :name, :role)
    else
      params.require(:user).permit(:email, :name)
    end
  end

  # Find user by id.
  # Call it as before_action as user by id required in multiple methods.
  def set_user
    @user = User.find(params[:id])
  end

  # Call it on before action so that only admin can access methods of this controller. 
  # In case of role other than admin it will return authorization error.
  def authenticate_admin!
    if current_user.role != "admin"
      render json: { errors: 'you are not authorize to access this request' }, status: :bad_request and return
    end
  end
end
