using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using WebBomba.Data;
using WebBomba.Interfaces;
using WebBomba.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IImageWorker, ImageWorker>();

builder.Services.AddDbContext<DataEFContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("MSSQLConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

var dir = Path.Combine(Directory.GetCurrentDirectory(), "images");
if(!Directory.Exists(dir))
{ 
    Directory.CreateDirectory(dir); 
}
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(dir),
    RequestPath = "/images"
});



app.UseRouting();

app.UseAuthorization();

//����������� ������������� - ���� ������� � url - �� ������� ������ �� ������ ����������
//http://localhost:5890 - ����� ����� - ������� ������� - /

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Category}/{action=Index}/{id?}");

//��������� ������������ ���� �����
app.SeedData();

app.Run();
