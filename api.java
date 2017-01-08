package com.Service.Data;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import com.Service.Control.Book;
import com.Service.Control.people;

/**
 * Servlet implementation class api
 */
@WebServlet("/api")
public class api extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public api() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// response.getWriter().append("Served at:
		// ").append(request.getContextPath());

		try {

			Class.forName("com.mysql.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost/nhanvien", "root", "");

			String sql = "select * from thongtin";
			PreparedStatement preparedStatement = connection.prepareStatement(sql);

			ResultSet resultSet = preparedStatement.executeQuery();
			List<people> list = new ArrayList<people>();

			while (resultSet.next()) {
				int id = resultSet.getInt("id");
				String hoten = resultSet.getString("ho_ten");
				String ngaysinh = resultSet.getString("ngay_sinh");
				String cmnd = resultSet.getString("cmnd");
				String mucluong = resultSet.getString("muc_luong");
				String diachi = resultSet.getString("dia_chi");
				people p = new people(id, hoten, ngaysinh, cmnd, mucluong, diachi);
				list.add(p);

			}
			ObjectMapper mapper = new ObjectMapper();
			String resul = mapper.writeValueAsString(list);
			// response.setContentType("application/json");
			response.getWriter().write(resul);

		} catch (SQLException e) {
			System.out.println("loi" + e.toString());
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
