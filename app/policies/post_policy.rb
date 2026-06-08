# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def show?
    owner? || published?
  end

  def create?
    true
  end

  def update?
    owner?
  end

  def destroy?
    create?
  end

  def owner?
    post.user_id == user.id
  end

  def published?
    !post.draft?
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      @scope.where(organization_id: @user.organization_id).published
    end
  end
end
