# frozen_string_literal: true

class PdfsJob
  include Sidekiq::Job

  def perform(user_id, post_slug, pdf_path)
    ActionCable.server.broadcast(user_id, { message: I18n.t("post.render"), progress: 25 })
    post = Post.includes(:categories).find_by!(slug: post_slug)
    content = ApplicationController.render(
      assigns: {
        post:
      },
      template: "posts/pdf/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: I18n.t("post.generate"), progress: 50 })
    pdf_blob = WickedPdf.new.pdf_from_string content
    ActionCable.server.broadcast(user_id, { message: I18n.t("post.upload"), progress: 75 })
    File.open(pdf_path, "wb") do |f|
      f.write(pdf_blob)
    end
    ActionCable.server.broadcast(user_id, { message: I18n.t("post.attach"), progress: 100 })
  end
end
