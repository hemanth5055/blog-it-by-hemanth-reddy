# frozen_string_literal: true

class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def show?
    is_owner = post.user_id == user.id
    same_org = post.organization_id == user.organization_id
    is_draft = post.draft?

    return true if is_owner
    return false if is_draft
    return true if same_org

    false
  end

  def create?
    post.user_id == user.id
  end

  def update?
    create?
  end

  def destroy?
    create?
  end
end
