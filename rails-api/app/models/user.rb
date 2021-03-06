class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  enum role: [:user, :admin]
  after_initialize :set_default_role, :if => :new_record?

  # set default role user if no role is assigned.
    def set_default_role
    self.role ||= :user
  end
end
