# You can use most Debian-based base images
FROM node:21-slim

# Install curl and unzip
RUN apt-get update && apt-get install -y curl unzip && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install bun
RUN curl -fsSL https://bun.sh/install | bash && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun && \
    ln -s /root/.bun/bin/bunx /usr/local/bin/bunx

# Copy the compile_page.sh script
COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

# Set the working directory for the nextjs app
WORKDIR /home/user/nextjs-app

# Initialize the nextjs app w/ bunx
RUN bunx --yes create-next-app@15.3.3 . --yes

# Install shadcn
RUN bunx --yes shadcn@2.6.3 init --yes -b neutral --force
RUN bunx --yes shadcn@2.6.3 add --all --yes

# Move the Nextjs app to the home directory and clean up
RUN mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app
