# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Job

  def perform(user_id, post_slug, report_path)
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.render"), progress: 25 })
    post = Post.includes(:categories).find_by!(slug: post_slug)
    content = ApplicationController.render(
      assigns: {
        post:
      },
      template: "posts/report/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.generate"), progress: 50 })
    pdf_blob = WickedPdf.new.pdf_from_string content
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.upload"), progress: 75 })
    File.open(report_path, "wb") do |f|
      f.write(pdf_blob)
    end
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.attach"), progress: 100 })
  end
end
