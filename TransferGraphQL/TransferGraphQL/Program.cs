using Microsoft.EntityFrameworkCore;
using TransferGraphQL.Context;
using TransferGraphQL.GraphQL;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost4200",
        builder => builder
            .WithOrigins("http://localhost:3000") // Allow requests from this origin
            .AllowAnyMethod()
            .AllowAnyHeader());
});
// Add DbContext
builder.Services.AddDbContext<AppDbContext>(
    options => {
        options.UseSqlServer(builder.Configuration.GetConnectionString("GraphQL"));
        options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    }
);

builder.Services.AddScoped<Query>();
builder.Services.AddScoped<Mutation>();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddMutationConventions(applyToAllMutations: true)
    .AddDefaultTransactionScopeHandler(); ;

var app = builder.Build();

app.UseStaticFiles();
app.MapGet("/", () => "Hello World!");
app.MapGraphQL();
app.Run();

