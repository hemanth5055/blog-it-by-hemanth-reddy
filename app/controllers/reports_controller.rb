# frozen_string_literal: true

class ReportsController < ApplicationController
  def create
    ReportsJob.perform_async(current_user.id, params[:post_slug], report_path)
  end

  def download
    if File.exist?(report_path)
      send_file(
        report_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_error(t("not_found", entity: "report"), :not_found)
    end
  end

  def report_path
    @_report_path ||= Rails.root.join("tmp/#{pdf_file_name}").to_s
  end

  def pdf_file_name
    params[:post_slug]
  end
end
