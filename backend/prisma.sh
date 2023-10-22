# Create schema.prisma file before mirgration
find . -type f -name "*.prisma" -exec cat {} \; > prisma/schema.prisma