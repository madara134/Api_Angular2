/*
Created		25-Dec-16
Modified		25-Dec-16
Project		
Model			
Company		
Author		
Version		
Database		PostgreSQL 8.1 
*/


/* Create Tables */


Create table "cong_ty"
(
	"ID" BigSerial NOT NULL,
	"Ten" Varchar(256),
	"Dien_Thoai" Varchar(20),
	"Dia_Chi" Varchar(256),
	"Tuoi_Toi_Thieu" Integer,
	"Tuoi_Toi_Da" Integer,
 primary key ("ID")
) Without Oids;


Create table "don_vi"
(
	"ID_DV" BigSerial NOT NULL,
	"Ten_DV" Varchar(256),
 primary key ("ID_DV")
) Without Oids;


Create table "loai_cong_viec"
(
	"ID_CV" BigSerial NOT NULL,
	"Ten_CV" Varchar(256),
 primary key ("ID_CV")
) Without Oids;


Create table "ngoai_ngu"
(
	"ID_NN" BigSerial NOT NULL,
	"Ten_NN" Varchar(256),
 primary key ("ID_NN")
) Without Oids;


Create table "nguoi_dung"
(
	"ID_ND" BigSerial NOT NULL,
	"Ten_ND" Varchar(256),
	"Mau_Khau" Varchar(256),
	"Mo_rong" Varchar(256),
	"ID_NND" Bigint NOT NULL,
 primary key ("ID_ND")
) Without Oids;


Create table "nhan_vien"
(
	"ID_Nhan_Vien" BigSerial NOT NULL,
	"Ho_Ten" Varchar(256),
	"Ngay_Sinh" Timestamp with time zone,
	"CMND" Varchar(20),
	"Muc_Luong" Bigint,
	"Dia_Chi" Varchar(256),
	"ID_DV" Bigint NOT NULL,
	"ID" Bigint NOT NULL,
 primary key ("ID_Nhan_Vien")
) Without Oids;


Create table "nhom_nguoi_dung"
(
	"ID_NND" BigSerial NOT NULL,
	"Ten_NND" Char(20),
	"Ma_So" Varchar(256),
 primary key ("ID_NND")
) Without Oids;


Create table "phieu_phan_cong"
(
	"ID_PC" BigSerial NOT NULL,
	"Ngay_bat_dau" Timestamp with time zone,
	"So_ngay" Char(20),
	"ID_CV" Bigint NOT NULL,
	"ID_Nhan_Vien" Bigint NOT NULL,
 primary key ("ID_PC","ID_CV","ID_Nhan_Vien")
) Without Oids;


Create table "yeu_cau"
(
	"ID_CV" Bigint NOT NULL,
	"ID_NN" Bigint NOT NULL,
	"ID_YC" Char(20) NOT NULL,
 primary key ("ID_CV","ID_NN","ID_YC")
) Without Oids;


/* Create Foreign Keys */

Alter table "nhan_vien" add  foreign key ("ID") references "cong_ty" ("ID") on update restrict on delete restrict;

Alter table "nhan_vien" add  foreign key ("ID_DV") references "don_vi" ("ID_DV") on update restrict on delete restrict;

Alter table "yeu_cau" add  foreign key ("ID_CV") references "loai_cong_viec" ("ID_CV") on update restrict on delete restrict;

Alter table "phieu_phan_cong" add  foreign key ("ID_CV") references "loai_cong_viec" ("ID_CV") on update restrict on delete restrict;

Alter table "yeu_cau" add  foreign key ("ID_NN") references "ngoai_ngu" ("ID_NN") on update restrict on delete restrict;

Alter table "phieu_phan_cong" add  foreign key ("ID_Nhan_Vien") references "nhan_vien" ("ID_Nhan_Vien") on update restrict on delete restrict;

Alter table "nguoi_dung" add  foreign key ("ID_NND") references "nhom_nguoi_dung" ("ID_NND") on update restrict on delete restrict;


